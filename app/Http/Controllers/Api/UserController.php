<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\StoreUserWithoutNameRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
    /**
     * @param StoreUserRequest $request
     * @param UserService $service
     * @return JsonResponse
     */
    public function register(StoreUserRequest $request, UserService $service): JsonResponse
    {
        $service->register($request->name, $request->email, $request->password);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully'
        ]);
    }

    /**
     * @param StoreUserWithoutNameRequest $request
     * @param UserService $service
     * @return JsonResponse
     */
    public function login(StoreUserWithoutNameRequest $request, UserService $service): JsonResponse
    {
        try {
            $token = $service->login($request->email, $request->password);

            return response()->json([
                'token' => $token,
                'success' => true,
                'message' => 'User logged in successfully'
            ]);

        } catch (\InvalidArgumentException $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ]);
        }
    }

    /**
     * @param Request $request
     * @param UserService $service
     * @return JsonResponse
     */
    public function logout(Request $request, UserService $service): JsonResponse
    {
        $service->logout($request->bearerToken());

        return response()->json([
            'success' => true,
            'message' => 'User logged out successfully'
        ]);
    }
}
