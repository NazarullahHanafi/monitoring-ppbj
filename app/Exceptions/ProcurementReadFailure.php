<?php

namespace App\Exceptions;

final class ProcurementReadFailure extends \RuntimeException
{
    public function __construct(\Throwable $previous, public readonly ?int $pages)
    {
        parent::__construct('private_reader_failed', 0, $previous);
    }
}
