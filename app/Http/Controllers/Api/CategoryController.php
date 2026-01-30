<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(CategoryService $service): JsonResponse
    {
        $categories = $service->get_all();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request, CategoryService $service): JsonResponse
    {
        $service->create($request->name, $request->user()->id);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CategoryService $service, string $id): JsonResponse
    {
        $category = $service->get_category_by_id($id);

        return response()->json([
            'success' => true,
            'category' => $category,
            'message' => 'Category retrieved successfully!'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCategoryRequest $request, CategoryService $service, string $id): JsonResponse
    {
        $service->update($id, $request->name);

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryService $service, string $id): JsonResponse
    {
        $service->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully!'
        ]);
    }
}
