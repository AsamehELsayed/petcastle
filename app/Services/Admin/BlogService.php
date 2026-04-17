<?php

namespace App\Services\Admin;

use App\Models\BlogPost;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogService
{
    public function getAllPosts($filters = [])
    {
        $query = BlogPost::with('author')->latest();

        if (isset($filters['search'])) {
            $query->where('title', 'like', '%' . $filters['search'] . '%');
        }

        return $query->paginate(10);
    }

    public function createPost($data)
    {
        if (isset($data['featured_image']) && $data['featured_image'] instanceof \Illuminate\Http\UploadedFile) {
            $data['featured_image'] = $data['featured_image']->store('blog', 'public');
        }

        if (isset($data['is_published']) && $data['is_published']) {
            $data['published_at'] = now();
        }

        return BlogPost::create($data);
    }

    public function updatePost($id, $data)
    {
        $post = BlogPost::findOrFail($id);

        if (isset($data['featured_image']) && $data['featured_image'] instanceof \Illuminate\Http\UploadedFile) {
            if ($post->featured_image) {
                Storage::disk('public')->delete($post->featured_image);
            }
            $data['featured_image'] = $data['featured_image']->store('blog', 'public');
        }

        if (isset($data['is_published']) && $data['is_published'] && !$post->is_published) {
            $data['published_at'] = now();
        }

        $post->update($data);
        return $post;
    }

    public function deletePost($id)
    {
        $post = BlogPost::findOrFail($id);
        if ($post->featured_image) {
            Storage::disk('public')->delete($post->featured_image);
        }
        return $post->delete();
    }
}
