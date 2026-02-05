<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case VIREMENT_BANCAIRE = 'Virement Bancaire';
    case CHEQUE = 'Chèque';
    case ESPECES = 'Espèces';

    public function label(): string
    {
        return $this->value;
    }
}
