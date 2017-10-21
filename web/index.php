<?php

ini_set('display_errors', 0);

require_once __DIR__.'/../vendor/autoload.php';

$app = require __DIR__.'/../src/app.php';
require __DIR__.'/../config/prod.php';
require __DIR__.'/../src/controllers.php';

$app['debug']=true;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

$dbURL = parse_url(getenv("CLEARDB_DATABASE_URL"));
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
      'driver' => 'pdo_mysql',
      'dbname' => 'heroku_bc01d6c27e92b76',
      'user' => 'ba53d3edafdd3c',
      'password' => '04a69937',
      'host'=> $dbURL["host"],
    )
  ));

$app->get('/',function() use($app){
    return $app['twig']->render('index.twig'); 
});

$app->run();
