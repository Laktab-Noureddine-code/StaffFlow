<?php

namespace App\Enums;

enum ContractType: string
{
    case CDI = 'CDI';
    case CDD = 'CDD';
    case STAGE = 'Stage';
    case FREELANCE = 'Freelance';

    public function label(): string
    {
        return $this->value;
    }
}
