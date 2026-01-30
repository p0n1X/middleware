<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class UserService
{
    /**
     * @param string $name
     * @param string $email
     * @param string $password
     * @return void
     */
    public function register(string $name, string $email, string $password): void
    {
        User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ]);
    }

    /**
     * @param string $email
     * @return User
     */
    public function get_user_by_email(string $email): User
    {
        return User::where('email', $email)->first();
    }

    /**
     * @param string $email
     * @param string $password
     * @return string
     */
    public function login(string $email, string $password): string
    {
        $user = $this->get_user_by_email($email);
        if (!$user || !Hash::check($password, $user->password)) {
            throw new \InvalidArgumentException();
        }

        $user->tokens()->delete();

        return $user->createToken('api-token')->plainTextToken;
    }

    /**
     * @param $bearer
     * @return void
     */
    public function logout($bearer): void
    {
        $token = PersonalAccessToken::findToken($bearer);

        if ($token) {
            $token->delete();
        }
    }
}
