<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\TicketMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Display a listing of all tickets.
     */
    public function index(Request $request)
    {
        $query = Ticket::with('user')
            ->orderBy('updated_at', 'desc');

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search by subject or user
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('subject', 'like', "%{$search}%")
                  ->orWhere('id', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($q2) use ($search) {
                      $q2->where('name', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        $tickets = $query->paginate(15)->withQueryString();

        // Stats
        $stats = [
            'total' => Ticket::count(),
            'pending' => Ticket::where('status', 'pending')->count(),
            'answered' => Ticket::where('status', 'answered')->count(),
            'closed' => Ticket::where('status', 'closed')->count(),
        ];

        return Inertia::render('admin/tickets', [
            'tickets' => $tickets,
            'stats' => $stats,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Display the specified ticket.
     */
    public function show($id)
    {
        $ticket = Ticket::with(['user', 'messages.user'])->findOrFail($id);

        return Inertia::render('admin/tickets/show', [
            'ticket' => $ticket,
        ]);
    }

    /**
     * Reply to a ticket (admin).
     */
    public function reply(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $ticket = Ticket::findOrFail($id);

        TicketMessage::create([
            'ticket_id' => $ticket->id,
            'user_id' => $request->user()->id,
            'message' => $request->message,
            'is_admin' => true,
        ]);

        $ticket->update(['status' => 'answered']);
        $ticket->touch();

        return back()->with('success', 'Balasan admin terkirim.');
    }

    /**
     * Close a ticket.
     */
    public function close($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->update(['status' => 'closed']);

        return back()->with('success', 'Tiket ditutup.');
    }

    /**
     * Reopen a ticket.
     */
    public function reopen($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->update(['status' => 'pending']);

        return back()->with('success', 'Tiket dibuka kembali.');
    }
}
