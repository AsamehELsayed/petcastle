<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Drop coupon usages (references coupons and orders)
        Schema::dropIfExists('coupon_usages');

        // 2. Remove coupon related columns and foreign keys from orders table
        $foreignKeys = Schema::getForeignKeys('orders');
        $hasCouponFk = collect($foreignKeys)->contains(function ($fk) {
            return in_array('coupon_id', $fk['columns']) || $fk['name'] === 'orders_coupon_id_foreign';
        });

        Schema::table('orders', function (Blueprint $table) use ($hasCouponFk) {
            if (Schema::hasColumn('orders', 'coupon_id')) {
                if ($hasCouponFk) {
                    $table->dropForeign(['coupon_id']);
                }
                $table->dropColumn('coupon_id');
            }
            if (Schema::hasColumn('orders', 'discount_amount')) {
                $table->dropColumn('discount_amount');
            }
        });

        // 3. Now it is safe to drop the coupons table
        Schema::dropIfExists('coupons');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('type'); // fixed, percentage
            $table->decimal('value', 10, 2);
            $table->decimal('min_order_amount', 10, 2)->default(0);
            $table->integer('usage_limit')->nullable();
            $table->integer('used_count')->default(0);
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('coupon_usages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('coupon_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('coupon_id')->nullable()->constrained()->onDelete('set null');
            $table->decimal('discount_amount', 10, 2)->default(0);
        });
    }
};
