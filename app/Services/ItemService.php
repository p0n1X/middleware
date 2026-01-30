<?php

namespace App\Services;

use App\Models\Item;
use Illuminate\Database\Eloquent\Collection;

class ItemService
{
    /**
     * @return Collection
     */
    public function get_all(): Collection
    {
        return Item::all();
    }

    public function create(string $content, int $user_id, int $category_id): Item
    {
        return Item::create([
            'content' => $content,
            'user_id' => $user_id,
            'category_id' => $category_id,
        ]);
    }

    /**
     * @param int $id
     * @return Item
     */
    public function get_item_by_id(int $id): item
    {
        return Item::where('id', $id)->first();
    }

    public function update(int $id, string $content, int $category_id): Item
    {
        $category = $this->get_item_by_id($id);
        $category->content = $content;
        $category->category_id = $category_id;
        $category->save();

        return $category;
    }

    /**
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        $category = $this->get_item_by_id($id);
        $category->delete();
    }

    /**
     * @param int $id
     * @return void
     */
    public function item_completed(int $id): void
    {
        $item = $this->get_item_by_id($id);
        $item->is_completed = true;
        $item->due_date = now();

        $item->save();
    }
}
