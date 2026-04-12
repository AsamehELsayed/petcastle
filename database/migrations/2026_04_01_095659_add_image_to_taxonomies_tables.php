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
        Schema::table('categories', function (Blueprint $table) {
            $table->string('image')->nullable();
        });
        Schema::table('brands', function (Blueprint $table) {
            $table->string('image')->nullable();
        });
        Schema::table('species', function (Blueprint $table) {
            $table->string('image')->nullable();
        });
        Schema::table('breeds', function (Blueprint $table) {
            $table->string('image')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('image');
        });
        Schema::table('brands', function (Blueprint $table) {
            $table->dropColumn('image');
        });
        Schema::table('species', function (Blueprint $table) {
            $table->dropColumn('image');
        });
        Schema::table('breeds', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
};
