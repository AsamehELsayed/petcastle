<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        if (!Schema::hasTable('categories')) {
            Schema::create('categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->foreignId('parent_id')->nullable()->constrained('categories')->nullOnDelete();
                $table->timestamps();
            });
        } else {
            Schema::table('categories', function (Blueprint $table) {
                if (!Schema::hasColumn('categories', 'name')) {
                    $table->string('name')->after('id');
                }
                if (!Schema::hasColumn('categories', 'parent_id')) {
                    $table->foreignId('parent_id')->nullable()->after('name')->constrained('categories')->nullOnDelete();
                }
            });
        }
    }
    public function down(): void {
        Schema::dropIfExists('categories');
    }
};
