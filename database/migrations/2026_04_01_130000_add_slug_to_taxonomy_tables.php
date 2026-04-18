<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            if (!Schema::hasColumn('categories', 'slug')) {
                $table->string('slug')->unique()->after('name')->nullable();
            }
        });

        Schema::table('species', function (Blueprint $table) {
            if (!Schema::hasColumn('species', 'slug')) {
                $table->string('slug')->unique()->after('name')->nullable();
            }
        });

        Schema::table('breeds', function (Blueprint $table) {
            if (!Schema::hasColumn('breeds', 'slug')) {
                $table->string('slug')->after('name')->nullable();
            }
        });

        // Populate existing records only if slug was just added or is empty
        \App\Models\Category::all()->whereNull('slug')->each(fn($c) => $c->update(['slug' => Str::slug($c->name)]));
        \App\Models\Species::all()->whereNull('slug')->each(fn($s) => $s->update(['slug' => Str::slug($s->name)]));
        \App\Models\Breed::all()->whereNull('slug')->each(fn($b) => $b->update(['slug' => Str::slug($b->name)]));

        // Now make them not nullable if they were just made available
        Schema::table('categories', function (Blueprint $table) {
            if (Schema::hasColumn('categories', 'slug')) {
                $table->string('slug')->nullable(false)->change();
            }
        });
        Schema::table('species', function (Blueprint $table) {
            if (Schema::hasColumn('species', 'slug')) {
                $table->string('slug')->nullable(false)->change();
            }
        });
        Schema::table('breeds', function (Blueprint $table) {
            if (Schema::hasColumn('breeds', 'slug')) {
                $table->string('slug')->nullable(false)->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
        Schema::table('species', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
        Schema::table('breeds', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
