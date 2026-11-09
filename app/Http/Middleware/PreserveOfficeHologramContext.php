<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

// Presentation only. Original department, CSRF and write guards still run.
class PreserveOfficeHologramContext
{
    public function handle(Request $request, Closure $next): Response
    {
        $response=$next($request);
        $channel=$request->input('office_frame');
        if($request->isMethodSafe()||!is_string($channel)||!preg_match('/\A\d{1,10}\z/D',$channel))return $response;
        $url=$response instanceof RedirectResponse?$response->getTargetUrl():($response instanceof JsonResponse&&$response->isSuccessful()?($response->getData(true)['redirect']??null):null);
        if(!is_string($url))return $response;
        $parts=parse_url($url);$origin=parse_url($request->getSchemeAndHttpHost());
        if(!$parts||isset($parts['host'])&&($parts['host']!==$origin['host']||($parts['scheme']??'')!==$origin['scheme']||($parts['port']??null)!==($origin['port']??null)))return $response;
        $tool=['/sp'=>'sp','/spph'=>'spph'][$parts['path']??'']??null;
        if(!$tool)return $response;
        parse_str($parts['query']??'',$query);$query['office_frame']=$channel;
        $target=route('virtual-office.hologram',['tool'=>$tool]+$query);
        if($response instanceof RedirectResponse)$response->setTargetUrl($target);
        else{$data=$response->getData(true);$data['redirect']=$target;$response->setData($data);}
        return $response;
    }
}
