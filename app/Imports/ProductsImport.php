<?php

namespace App\Imports;

use App\Models\Item;
use App\Models\ProductDetail;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductsImport implements ToModel, WithHeadingRow, WithValidation
{
    public function model(array $row)
    {
        return DB::transaction(function () use ($row) {
            $item = Item::create([
                'name'        => $row['name'],
                'description' => $row['description'] ?? null,
                'price'       => $row['price'],
                'type'        => 'product',
                'status'      => 'active',
            ]);

            ProductDetail::create([
                'item_id'         => $item->id,
                'stock'           => $row['stock'] ?? 0,
                'sku'             => $row['sku'] ?? (string) Str::uuid(), // Generate a UUID if SKU is missing
                'barcode'         => $row['barcode'] ?? null,
                'weight'          => $row['weight'] ?? null,
                'size'            => $row['size'] ?? null,
            ]);

            return $item;
        });
    }

    public function rules(): array
    {
        return [
            'name'  => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'nullable|integer|min:0',
            'sku'   => 'nullable|string|max:255',
            'barcode' => 'nullable|string|max:255',
            'weight'  => 'nullable|numeric|min:0',
            'size'    => 'nullable|string|max:255',
        ];
    }
}
