<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('orders')) {
            Schema::create('orders', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->foreignId('address_id')->nullable()->constrained('addresses')->nullOnDelete();
                $table->decimal('total_price', 10, 2);
                $table->enum('status', ['pending', 'paid', 'shipped', 'delivered', 'cancelled'])->default('pending')->index();
                $table->string('payment_method')->nullable();
                $table->string('phone')->nullable();
                $table->timestamps();
            });
        } else {
            Schema::table('orders', function (Blueprint $table) {
                if (!Schema::hasColumn('orders', 'user_id')) {
                    $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
                }
                if (!Schema::hasColumn('orders', 'address_id')) {
                    $table->foreignId('address_id')->nullable()->constrained('addresses')->nullOnDelete();
                }
                if (!Schema::hasColumn('orders', 'total_price')) {
                    $table->decimal('total_price', 10, 2)->after('user_id');
                }
                if (!Schema::hasColumn('orders', 'status')) {
                    $table->enum('status', ['pending', 'paid', 'shipped', 'delivered', 'cancelled'])->default('pending')->index();
                }
                if (!Schema::hasColumn('orders', 'payment_method')) {
                    $table->string('payment_method')->nullable();
                }
                if (!Schema::hasColumn('orders', 'phone')) {
                    $table->string('phone')->nullable();
                }
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
