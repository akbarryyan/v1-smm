<?php

namespace App\Http\Responses;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        /** @var User $user */
        $user = Auth::user();
        
        // Determine redirect path based on user role
        $redirectPath = $user->isAdmin() ? '/admin/dashboard' : '/dashboard';

        // Clear any intended URL to prevent wrong redirects
        Session::forget('url.intended');

        return $request->wantsJson()
            ? new JsonResponse(['redirect' => $redirectPath], 200)
            : redirect($redirectPath);
    }
}
