<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return array_merge(parent::share($request), [
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'global_categories' => Category::whereNull('parent_id')->get(),
            'global_items' => Item::where('status', 'active')->latest()->limit(50)->get(),
            'whatsapp_settings' => [
                'enabled' => setting('whatsapp_enabled', '0'),
                'number' => setting('whatsapp_number', ''),
                'message' => setting('whatsapp_message', ''),
            ],
            'pending_animal_requests_count' => \App\Models\AnimalRequest::where('status', 'pending')->count(),
            'footer_settings' => [
                'branding' => setting('footer_branding', []),
                'social' => setting('footer_social', []),
                'contact' => setting('footer_contact', []),
                'copyright' => setting('footer_copyright', ''),
            ],
        ]);
    }
}
