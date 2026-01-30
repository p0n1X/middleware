<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    /**
     * @return Collection
     */
    public function get_all(): Collection
    {
        return Category::all();
    }

    /**
     * @param string $name
     * @param int $user_id
     * @return Category
     */
    public function create(string $name, int $user_id): Category
    {
        return Category::create([
            'name' => $name,
            'user_id' => $user_id,
        ]);
    }

    /**
     * @param int $id
     * @return Category
     */
    public function get_category_by_id(int $id): Category
    {
        return Category::where('id', $id)->first();
    }

    public function update(int $id, string $name): void
    {
        $category = $this->get_category_by_id($id);
        $category->name = $name;
        $category->save();
    }

    /**
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        $category = $this->get_category_by_id($id);
        $category->delete();
    }
}
