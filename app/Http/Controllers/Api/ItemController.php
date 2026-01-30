<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreItemRequest;
use App\Models\Item;
use App\Services\ItemService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->all();
        $query = Item::with(['user:id,name', 'category:id,name'])
            ->orderBy('created_at', 'desc');

        if (!empty($filters['category'])) {
            $query->where('category_id', $filters['category']);
        }

        if (!empty($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        if (!empty($filters['status'])) {
            $status = $filters['status'] == 'completed' ? 1 : 0;
            $query->where('is_completed', $status);
        }

        $items = $query->get();

        return response()->json([
            'data' => $items
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request, ItemService $service): JsonResponse
    {
        $item = $service->create($request->get('content'), $request->user()->id, $request->category_id);

        if ($request->get('priority')) {
            $item->priority = $request->get('priority');
        }

        $item->save();

        return response()->json([
            'success' => true,
            'message' => 'Item created successfully!',
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(ItemService $service, string $id): JsonResponse
    {
        $item = $service->get_item_by_id($id);

        return response()->json([
            'success' => true,
            'item' => $item,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreItemRequest $request, ItemService $service, string $id): JsonResponse
    {
        $item = $service->update($id, $request->get('content'), $request->category_id);

        if ($request->has('priority')) {
            $item->priority = $request->get('priority');
        }

        if ($request->has('is_completed')) {
            $item->is_completed = $request->get('is_completed');
            $item->due_date = now();
        }

        $item->save();
        return response()->json([
            'success' => true,
            'item' => $item
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ItemService $service, string $id): JsonResponse
    {
        $service->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Item deleted successfully!'
        ]);
    }

    public function completed(Request $request, ItemService $service, string $id): JsonResponse
    {
        $service->item_completed($id);

        return response()->json([
            'success' => true,
            'message' => 'Item completed successfully!'
        ]);
    }

    public function stats(Request $request): JsonResponse
    {
        $stats = DB::select("
                    SELECT
                COUNT(*) as all_items,
                SUM(CASE WHEN priority = 'high' THEN 1 ELSE 0 END ) AS high_priority,
                SUM(CASE WHEN priority = 'low' THEN 1 ELSE 0 END ) AS low_priority,
                SUM(CASE WHEN priority = 'medium' THEN 1 ELSE 0 END ) AS medium_priority,
                SUM(CASE WHEN is_completed = 1 THEN 1 ELSE 0 END ) AS completed,
                SUM(CASE WHEN is_completed = 0 THEN 1 ELSE 0 END ) AS incompleted
            FROM item;");
        return response()->json([
            'data' => $stats
        ]);
    }
}
