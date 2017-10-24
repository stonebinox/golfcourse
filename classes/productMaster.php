<?php
/*-------------------------------------
Author: Anoop Santhanam
Date Created: 20/10/17 16:44
Last Modified: 21/10/17 07:27
Comments: Main class file for 
product_master table.
-------------------------------------*/
class productMaster
{
    public $app=NULL;
    private $product_id=NULL;
    public $productValid=false;
    function __construct($productID=NULL) //to initialize a product object
    {
        $this->app=$GLOBALS['app'];
        if($productID!=NULL)
        {
            $this->product_id=addslashes(htmlentities($productID));
            $this->productValid=$this->verifyProduct();
        }
    }
    function verifyProduct() //to verify a product ID
    {
        if($this->product_id!=NULL)
        {
            $app=$this->app;
            $productID=$this->product_id;
            $pm="SELECT idproduct_master FROM product_master WHERE stat='1' AND idproduct_master='$productID'";
            $pm=$app['db']->fetchAssoc($pm);
            if(($pm!="")&&($pm!=NULL))
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
    function getProduct() //to get a product row
    {
        $app=$this->app;
        if($this->productValid)
        {
            $productID=$this->product_id;
            $pm="SELECT * FROM product_master WHERE idproduct_master='$productID'";
            $pm=$app['db']->fetchAssoc($pm);
            if(($pm!="")&&($pm!=NULL))
            {
                return $pm;
            }
            else
            {
                return "INVALID_PRODUCT_ID";
            }
        }
        else
        {
            return "INVALID_PRODUCT_ID";
        }
    }
    function getProducts() //to get all product rows
    {
        $app=$this->app;
        $pm="SELECT idproduct_master FROM product_master WHERE stat='1' ORDER BY idproduct_master DESC";
        $pm=$app['db']->fetchAll($pm);
        $productArray=array();
        for($i=0;$i<count($pm);$i++)
        {
            $product=$pm[$i];
            $productID=$product['idproduct_master'];
            $this->__construct($productID);
            $product=$this->getProduct();
            if(is_array($product))
            {
                array_push($productArray,$product);
            }
        }
        if(count($productArray)>0)
        {
            return $productArray;
        }
        else
        {
            return "NO_PRODUCTS_FOUND";
        }
    }
}
?>