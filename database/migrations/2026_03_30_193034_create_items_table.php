<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->enum('status', ['active', 'inactive', 'sold'])->default('active');
            $table->string('main_image')->nullable();
            $table->enum('type', ['animal', 'product']);
            $table->json('data')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('items');
    }
};
