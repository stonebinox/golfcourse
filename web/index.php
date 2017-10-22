<?php

ini_set('display_errors', 1);

require_once __DIR__.'/../vendor/autoload.php';
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = require __DIR__.'/../src/app.php';
require __DIR__.'/../config/prod.php';
require __DIR__.'/../src/controllers.php';

$app['debug']=true;

$app->register(new Silex\Provider\MonologServiceProvider(), array(
    'monolog.logfile' => 'php://stderr',
  ));
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
      'driver' => 'pdo_mysql',
      'dbname' => 'heroku_bc01d6c27e92b76',
      'user' => 'ba53d3edafdd3c',
      'password' => '04a69937',
      'host'=> "us-cdbr-iron-east-05.cleardb.net",
    )
  ));

$app->get('/',function() use($app){
    return $app->redirect('/map');
});

$app->get('/map',function() use($app){
    return $app['twig']->render('index.html.twig'); 
});

$app->get('/getCourses',function() use($app){
    require("../classes/courseMaster.php");
    $courseObj=new courseMaster;
    $courses=$courseObj->getCourses();
    if(is_array($courses))
    {
        return json_encode($courses);
    }
    else
    {
        return $courses;
    }
});

$app->get('/searchCourses',function() use($app){
    require("../classes/courseMaster.php");
    $courseObj=new courseMaster;
    $courses=$courseObj->searchCourses();
    if(is_array($courses))
    {
        return json_encode($courses);
    }
    else
    {
        return $courses;
    }
});

$app->run();
