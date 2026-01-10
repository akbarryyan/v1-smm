<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = News::orderBy('created_at', 'desc');

        // Filter by type
        if ($request->filled('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('is_active', $request->status === 'active');
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $news = $query->paginate(10)->withQueryString();

        // Stats
        $stats = [
            'total' => News::count(),
            'active' => News::where('is_active', true)->count(),
            'inactive' => News::where('is_active', false)->count(),
        ];

        return Inertia::render('admin/news', [
            'news' => $news,
            'stats' => $stats,
            'filters' => $request->only(['type', 'status', 'search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|in:announcement,update,promo,maintenance',
            'is_active' => 'boolean',
        ]);

        News::create($validated);

        return back()->with('success', 'Berita berhasil ditambahkan');
    }

    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|in:announcement,update,promo,maintenance',
            'is_active' => 'boolean',
        ]);

        $news->update($validated);

        return back()->with('success', 'Berita berhasil diperbarui');
    }

    public function destroy(News $news)
    {
        $news->delete();

        return back()->with('success', 'Berita berhasil dihapus');
    }

    public function toggle(News $news)
    {
        $news->update(['is_active' => !$news->is_active]);

        return back()->with('success', 'Status berita berhasil diubah');
    }
}
