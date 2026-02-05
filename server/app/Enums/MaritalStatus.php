<?php

namespace App\Enums;

enum MaritalStatus: string
{
    case CELIBATAIRE = 'célibataire';
    case MARIE = 'marié';
    case DIVORCE = 'divorcé';
    case VEUF = 'veuf';


    public function label(): string
    {
        return $this->value;
    }
}
