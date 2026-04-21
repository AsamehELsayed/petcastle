<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@castlepets.com')->first() 
               ?? User::where('role', 'admin')->first();

        if (!$admin) {
            return;
        }

        $posts = [
            [
                'title' => '10 Essential Tips for First-Time Puppy Owners',
                'excerpt' => 'Welcoming a new puppy into your home is a joyous occasion, but it comes with responsibilities. Here are 10 tips to help you get started.',
                'content' => '<h2>Introduction</h2><p>Bringing a puppy home is one of the most exciting experiences a person can have. However, the first few weeks can also be overwhelming if you aren\'t prepared. From puppy-proofing your living space to establishing a routine, there is a lot to consider.</p><h3>1. Puppy-Proof Your Home</h3><p>Before your new friend arrives, make sure your home is safe. Remove any toxic plants, secure loose wires, and keep small objects out of reach.</p><h3>2. Establish a Routine</h3><p>Puppies thrive on consistency. Set a schedule for feeding, potty breaks, and playtime to help them feel secure and learn faster.</p>',
                'is_published' => true,
                'author_id' => $admin->id,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'The Best Diet for Your Senior Cat',
                'excerpt' => 'As cats age, their nutritional needs change. Discover the best foods to keep your senior feline healthy and active.',
                'content' => '<h2>Caring for Senior Cats</h2><p>Senior cats often require fewer calories but higher quality protein. It\'s important to choose a diet that supports joint health and kidney function.</p><p>Consult with your veterinarian to determine the best specific needs for your cat, but generally, look for foods rich in omega-3 fatty acids and antioxidants.</p>',
                'is_published' => true,
                'author_id' => $admin->id,
                'published_at' => now()->subDays(3),
            ],
            [
                'title' => 'Understanding Your Pet\'s Body Language',
                'excerpt' => 'Pets communicate in many ways. Learn to interpret their tail wags, ear positions, and vocalizations to build a stronger bond.',
                'content' => '<h2>Reading the Signs</h2><p>Have you ever wondered what your dog is trying to tell you when they tilt their head? Or why your cat suddenly starts kneading your lap? Understanding these signals is key to a happy pet-owner relationship.</p><p>For example, a wagging tail doesn\'t always mean a dog is happy—it can also indicate agitation or curiosity depending on the height and speed of the wag.</p>',
                'is_published' => true,
                'author_id' => $admin->id,
                'published_at' => now()->subDays(1),
            ],
            [
                'title' => '5 Rare Exotic Birds You Need to See',
                'excerpt' => 'From vibrant macaws to intelligent African Greys, explore some of the most stunning exotic birds available at PetCastle.',
                'content' => '<h2>The Beauty of Birds</h2><p>Exotic birds are fascinating companions that bring color and life into any home. However, they require specialized care and a lot of social interaction.</p><p>Our collection at PetCastle includes hand-raised birds that are ready to find their forever families.</p>',
                'is_published' => true,
                'author_id' => $admin->id,
                'published_at' => now(),
            ],
            [
                'title' => 'Winter Safety: Keeping Your Pets Warm',
                'excerpt' => 'When the temperature drops, it\'s important to take extra precautions for your pets. Here\'s how to keep them safe and warm.',
                'content' => '<h2>Winter Care Tips</h2><p>Just like humans, pets can suffer from frostbite and hypothermia. Limit outdoor time during extreme cold, and consider a coat for short-haired breeds.</p><p>Also, beware of salt and antifreeze on sidewalks, as these can be toxic to paws and when ingested.</p>',
                'is_published' => true,
                'author_id' => $admin->id,
                'published_at' => now()->addHours(2),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(
                ['slug' => Str::slug($post['title'])],
                $post
            );
        }
    }
}
