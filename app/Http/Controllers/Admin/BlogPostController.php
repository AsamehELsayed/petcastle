<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\BlogService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    protected $blogService;

    public function __construct(BlogService $blogService)
    {
        $this->blogService = $blogService;
    }

    public function index(Request $request)
    {
        $posts = $this->blogService->getAllPosts($request->all());
        return Inertia::render('Admin/Blog/Index', [
            'posts' => $posts,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blog/Edit', [
            'post' => null
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:10240',
            'is_published' => 'boolean',
        ]);

        $validated['author_id'] = auth()->id();

        $this->blogService->createPost($validated);
        return redirect()->route('admin.blog.index')->with('success', 'Post created successfully.');
    }

    public function edit($id)
    {
        $post = \App\Models\BlogPost::findOrFail($id);
        return Inertia::render('Admin/Blog/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'sometimes|required|string',
            'featured_image' => 'nullable|image|max:10240',
            'is_published' => 'boolean',
        ]);

        $this->blogService->updatePost($id, $validated);
        return redirect()->route('admin.blog.index')->with('success', 'Post updated successfully.');
    }

    public function destroy($id)
    {
        $this->blogService->deletePost($id);
        return redirect()->back()->with('success', 'Post deleted successfully.');
    }
}
