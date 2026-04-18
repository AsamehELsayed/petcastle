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
        // 1. Repair 'categories' table
        if (Schema::hasTable('categories')) {
            Schema::table('categories', function (Blueprint $table) {
                if (!Schema::hasColumn('categories', 'name')) {
                    $table->string('name')->after('id');
                }
                if (!Schema::hasColumn('categories', 'parent_id')) {
                    $table->foreignId('parent_id')->nullable()->after('name')->constrained('categories')->nullOnDelete();
                }
                if (!Schema::hasColumn('categories', 'slug')) {
                    $table->string('slug')->unique()->nullable()->after('name');
                }
            });
        }

        // 2. Repair 'orders' table
        if (Schema::hasTable('orders')) {
            Schema::table('orders', function (Blueprint $table) {
                if (!Schema::hasColumn('orders', 'total_price')) {
                    $table->decimal('total_price', 10, 2)->after('id');
                }
                if (!Schema::hasColumn('orders', 'coupon_id')) {
                    $table->foreignId('coupon_id')->nullable()->constrained('coupons')->nullOnDelete();
                }
                if (!Schema::hasColumn('orders', 'discount_amount')) {
                    $table->decimal('discount_amount', 10, 2)->default(0);
                }
            });
        }

        // 3. Repair 'species' and 'breeds' for slugs
        if (Schema::hasTable('species')) {
            Schema::table('species', function (Blueprint $table) {
                if (!Schema::hasColumn('species', 'slug')) {
                    $table->string('slug')->unique()->nullable()->after('name');
                }
            });
        }
        if (Schema::hasTable('breeds')) {
            Schema::table('breeds', function (Blueprint $table) {
                if (!Schema::hasColumn('breeds', 'slug')) {
                    $table->string('slug')->nullable()->after('name');
                }
            });
        }
        
        // 4. Ensure slugs are populated if they were just added
        $this->populateSlugs();
    }

    private function populateSlugs()
    {
        try {
            if (class_exists(\App\Models\Category::class)) {
                \App\Models\Category::whereNull('slug')->get()->each(function ($item) {
                    $item->update(['slug' => \Illuminate\Support\Str::slug($item->name)]);
                });
            }
            if (class_exists(\App\Models\Species::class)) {
                \App\Models\Species::whereNull('slug')->get()->each(function ($item) {
                    $item->update(['slug' => \Illuminate\Support\Str::slug($item->name)]);
                });
            }
            if (class_exists(\App\Models\Breed::class)) {
                \App\Models\Breed::whereNull('slug')->get()->each(function ($item) {
                    $item->update(['slug' => \Illuminate\Support\Str::slug($item->name)]);
                });
            }
        } catch (\Throwable $e) {
            // Skip data population if models or columns aren't ready
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No reverse for repair migration to avoid accidental data loss
    }
};
