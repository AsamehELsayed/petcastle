<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::where('is_published', true)
            ->with('author')
            ->latest('published_at')
            ->paginate(9);

        return Inertia::render('Blog/Index', [
            'posts' => $posts
        ]);
    }

    public function show($slug)
    {
        $post = BlogPost::where('slug', $slug)
            ->where('is_published', true)
            ->with('author')
            ->firstOrFail();

        // Related posts
        $relatedPosts = BlogPost::where('is_published', true)
            ->where('id', '!=', $post->id)
            ->latest('published_at')
            ->limit(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts
        ]);
    }
}
