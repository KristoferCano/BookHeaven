<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;

class VerifyEmailCustom extends VerifyEmail
{
    protected function verificationUrl($notifiable)
    {
        return URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(60),
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
            ]
        );
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('✅ Registro exitoso en BookHeaven')
            ->greeting('¡Bienvenido/a ' . $notifiable->name . '!')
            ->line('Tu registro fue exitoso.')
            ->line('Para activar tu cuenta, confirma tu correo electrónico haciendo clic en el botón.')
            ->action('Confirmar mi correo', $this->verificationUrl($notifiable))
            ->line('Si no creaste esta cuenta, puedes ignorar este correo.')
            ->salutation('— El equipo de BookHeaven 📚');
    }
}
