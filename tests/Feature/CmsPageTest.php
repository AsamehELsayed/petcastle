<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\Section;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class CmsPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_dynamic_cms_page_renders_with_active_sections()
    {
        // 1. Arrange
        $page = Page::create([
            'title' => 'About Us Test',
            'slug' => 'about-us-test',
            'status' => 'published',
        ]);

        // Active Section
        Section::create([
            'page_id' => $page->id,
            'key' => 'hero_active',
            'type' => 'hero',
            'data' => [
                'title' => 'Welcome to About Us',
                'bgColor' => '#ff0000',
            ],
            'order' => 0,
            'is_active' => true,
        ]);

        // Inactive Section
        Section::create([
            'page_id' => $page->id,
            'key' => 'text_inactive',
            'type' => 'text',
            'data' => [
                'content' => 'This should not be rendered',
            ],
            'order' => 1,
            'is_active' => false,
        ]);

        // 2. Act
        $response = $this->get('/about-us-test');

        // 3. Assert
        $response->assertStatus(200);

        // Verify Inertia renders the right component and gets the right props
        $response->assertInertia(fn (Assert $pageArgs) => $pageArgs
            ->component('EcommerceHome')
            ->has('page')
            ->where('page.title', 'About Us Test')
            ->has('page.active_sections', 1)
            ->where('page.active_sections.0.key', 'hero_active')
        );
    }

    public function test_dynamic_cms_page_returns_404_if_not_found()
    {
        $response = $this->get('/non-existent-page-slug');
        $response->assertStatus(404);
    }
}
