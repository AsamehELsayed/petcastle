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
            $table->string('slug')->unique()->after('name')->nullable();
        });

        Schema::table('species', function (Blueprint $table) {
            $table->string('slug')->unique()->after('name')->nullable();
        });

        Schema::table('breeds', function (Blueprint $table) {
            $table->string('slug')->after('name')->nullable();
        });

        // Populate existing records
        \App\Models\Category::all()->each(fn($c) => $c->update(['slug' => Str::slug($c->name)]));
        \App\Models\Species::all()->each(fn($s) => $s->update(['slug' => Str::slug($s->name)]));
        \App\Models\Breed::all()->each(fn($b) => $b->update(['slug' => Str::slug($b->name)]));

        // Now make them not nullable
        Schema::table('categories', function (Blueprint $table) {
            $table->string('slug')->nullable(false)->change();
        });
        Schema::table('species', function (Blueprint $table) {
            $table->string('slug')->nullable(false)->change();
        });
        Schema::table('breeds', function (Blueprint $table) {
            $table->string('slug')->nullable(false)->change();
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
