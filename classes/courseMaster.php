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
            $courseID=$this->course_id;
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
    function getCourses($offset=0) //to get all course rows
    {
        $app=$this->app;
        $offset=addslashes(htmlentities($offset));
        if((is_numeric($offset))&&($offset!="")&&($offset!=NULL))
        {
            $cm="SELECT idcourse_master FROM course_master WHERE stat='1' ORDER BY idcourse_master DESC LIMIT $offset,100";
            $courseArray=array();
            while($row=$app['db']->fetchAssoc($cm))
            {
                $courseID=$row['idcourse_master'];
                $this->__construct($courseID);
                $course=$this->getCourse();
                if(is_array($course))
                {
                    array_push($courseArray,$course);
                }
            }
            if(count($courseArray)>0)
            {
                return $courseArray;
            }
            else
            {
                return "NO_COURSES_FOUND";
            }
        }
        else
        {
            return "INVALID_OFFSET_VALUE";
        }
    }
    function searchCourses($searchText) //to search for courses
    {
        $app=$this->app;
        $searchText=trim(addslashes(htmlentities($searchText)));
        if(($searchText!="")&&($searchText!=NULL))
        {
            if(strpos($searchText," ")==false)
            {
                $cm="SELECT idcourse_master FROM course_master WHERE stat='1' AND course_name LIKE '%$searchText%'";
            }
            else{
                $e=explode(" ",$searchText);
                $cm="SELECT idcourse_master FROM course_master WHERE stat='1' AND ";
                for($i=0;$i<count($e);$i++)
                {
                    $word=$searchText[$i];
                    $cm.="course_name LIKE '%$word%'";
                    if(($i+1)<count($e))
                    {
                        $cm.=" AND ";
                    }
                }
            }
            $cm.=" ORDER BY idcourse_master DESC";
            $courseArray=array();
            while($row=$app['db']->fetchAssoc($cm))
            {
                $courseID=$row['idcourse_master'];
                $this->__construct($courseID);
                $course=$this->getCourse();
                if(is_array($course))
                {
                    array_push($courseArray,$course);
                }
            }
            if(count($courseArray)>0)
            {
                return $courseArray;
            }
            else
            {
                return "NO_COURSES_FOUND";
            }
        }
        else
        {
            return "INVALID_SEARCH_TEXT";
        }
    }
}
?>