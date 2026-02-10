<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string'
        ]);

        $user =  User::create([
            'email' => $fields['email'],
            'name' => $fields['name'],
            'password' => Hash::make($fields['password'])
        ]);

        $user->assignRole("admin");

        $cookie = $this->generateToken($user);
        return response(['message' => 'User registered successfully'], 201)->withCookie($cookie);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response([
                'message' => 'Invalid credentials'
            ], 401);
        }
        $user = Auth::user();
        $cookie = $this->generateToken($user);

        return response(['message' => 'Success'], 200)->withCookie($cookie);
    }

    public function me(Request $request)
    {
        $token = $request->cookie('jwt');
        if (!$token) {
            return response(['message' => 'Unauthenticated'], 401);
        }

        $accessToken = PersonalAccessToken::findToken($token);
        if (!$accessToken) {
            return response(['message' => 'Invalid token'], 401);
        }

        $user = $accessToken->tokenable;
        $company = $user->company;

        if(!$company){
            return response()
            ->json(['user'=>new UserResource($user) ], status: 200);
        }

        return response()
            ->json(['user'=>new UserResource($user) ,'company'=>new CompanyResource($company)], status: 200);
    }
    public function logout(Request $request)
    {
        $token = $request->cookie('jwt');
        if ($token) {
            $accessToken = PersonalAccessToken::findToken($token);
            if ($accessToken) {
                $accessToken->delete();
                return response(['message' => 'Logged out successfully'], 200)->withCookie(cookie()->forget('jwt'));
            }
        }
        return response(['message' => 'Unauthenticated'], 401);
    }
    private function generateToken($user)
    {
        $token = $user->createToken('token')->plainTextToken;
        $cookie = cookie('jwt', $token, 60 * 24);
        return $cookie;
    }
}
