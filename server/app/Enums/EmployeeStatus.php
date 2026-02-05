<?php

namespace App\Enums;

enum EmployeeStatus: string
{
    case ACTIF = 'actif';
    case SUSPENDU = 'suspendu';
    case RESILIE = 'résilié';
    public function label(): string
    {
        return match ($this) {
            self::ACTIF => "Actif",
            self::SUSPENDU => "Suspendu",
            self::RESILIE => "Résilié",
        };
    }
}
