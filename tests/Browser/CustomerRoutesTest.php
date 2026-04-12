<?php

use App\Models\User;
use Laravel\Dusk\Browser;

test('customer can visit portal dashboard', function () {
    $user = User::where('role', 'customer')->first();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/portal')
            ->waitForText('Welcome') // adjust based on actual content
            ->assertPathIs('/portal');
    });
});

test('customer can visit profile page', function () {
    $user = User::where('role', 'customer')->first();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/portal/profile')
            ->waitForText('Profile Information')
            ->assertPathIs('/portal/profile');
    });
});
