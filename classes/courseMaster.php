<?php
/*-------------------------------------
Author: Anoop Santhanam
Date Created: 20/10/17 15:34
Last Modified: 21/10/17 07:27
Comments: Main class file for 
course_master table.
-------------------------------------*/
class courseMaster
{
    public $app=NULL;
    private $course_id=NULL;
    public $courseValid=false;
    function __construct($courseID=NULL) //to initialize a course object
    {
        $this->app=$GLOBALS['app'];
        if($courseID!=NULL)
        {
            $this->course_id=addslashes(htmlentities($courseID));
            $this->courseValid=$this->verifyCourse();
        }
    }
    function verifyCourse() //to verify a course ID
    {
        if($this->course_id!=NULL)
        {
            $app=$this->app;
            $courseID=$this->course_id;
            $cm="SELECT idcourse_master FROM course_master WHERE stat='1' AND idcourse_master='$courseID'";
            $cm=$app['db']->fetchAssoc($cm);
            if(($cm!="")&&($cm!=NULL))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
    function getCourse() //to get a course row
    {
        $app=$this->app;
        if($this->courseValid)
        {
            $cm="SELECT * FROM course_master WHERE idcourse_master='$courseID'";
            $cm=$app['db']->fetchAssoc($cm);
            if(($cm!="")&&($cm!=NULL))
            {
                return $cm;
            }
            else
            {
                return "INVALID_COURSE_ID";
            }
        }
        else
        {
            return "INVALID_COURSE_ID";
        }
    }
    function getCourses() //to get all course rows
    {
        $app=$this->app;
        $cm="SELECT idcourse_master FROM course_master WHERE stat='1' ORDER BY idcourse_master DESC";
        while($row=$app['db']->fetchAssoc($cm))
        {
            $courseID=$row['idcourse_master'];
            $this->__construct($courseID);
            $course=$this->getCourse();
        }
        
    }
}
?>