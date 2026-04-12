<?php

use Laravel\Dusk\Browser;

test('guest can visit home page', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/')
            ->waitForText('Welcome') // Adjust based on actual content
            ->assertPathIs('/');
    });
});

test('guest can visit login page', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/login')
            ->assertSee('Log in')
            ->assertPathIs('/login');
    });
});

test('guest can visit register page', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/register')
            ->assertSee('Create Account') // Adjust based on actual content
            ->assertPathIs('/register');
    });
});

test('guest can visit forgot password page', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/forgot-password')
            ->assertSee('Forgot your password?')
            ->assertPathIs('/forgot-password');
    });
});
