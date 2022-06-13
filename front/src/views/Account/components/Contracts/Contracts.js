import React from 'react'
import axios from 'axios';
import { SectionAlternate } from 'components/organisms';
import { DescriptionCta } from 'components/molecules';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Typography, Grid ,Box,useMediaQuery,Divider} from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const useStyles = makeStyles(theme => ({
  conatiner:{
     //margin:theme.spacing(5),
     [theme.breakpoints.down('sm')]: {
      width:'100%'
     },
    
  },
  title: {
   fontWeight: 'bold',
 },
 descriptionCta: {
   marginBottom: theme.spacing(3),
   [theme.breakpoints.up('md')]: {
     marginBottom: theme.spacing(4),
   },
 },
 tag: {
   fontWeight: 700,
   //margin: theme.spacing(0, 0, 1, 0),
   width:'auto'

 },
 }));

 const formatDate=(date="0")=> {
      if(date==='0'){
        var d = new Date()
      }
      else{
       d =new Date(date)
      }
      var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
const dateWithMonthsDelay= (d,months)=> {  
  const date = new Date(d)
  date.setMonth(date.getMonth() + parseInt(months))

  return date
}
const maxContractTerm=(info)=>{
  var maxCont=0
  for (let i=0;i<info.length;i++){
    if(parseInt(info[i].duration)>maxCont){
      maxCont=info[i].duration
    }
  }
  return maxCont
}



 const DraftContracts =({info,index,sendByEmail,activateNow,waiting})=>{
  const classes =useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });
  return (
   <Grid container style={{marginTop:index===0 ?'30px':'40px'}}>
     
         <Grid item xs={12}>
          <SectionAlternate className={classes.conatiner}>
              <DescriptionCta
            title={"Contract n° : "+(index+1)}
            primaryCta={
                info.status==='Draft'? 
              <Button variant="outlined" onClick={()=>activateNow(info.sfid,formatDate(),maxContractTerm(info.products))} color="primary" size={isSm ?"large":"small"}>
                Activate Now !
              </Button>
              :<></>
            }
            align={'left'}
            titleProps={{
              variant: isSm ? "h4":"h6",
              color: 'textPrimary',
              className: classes.title,
            }}
            className={classes.descriptionCta}
            data-aos="fade-up"
          />
          <Grid container justifyContent='flex-start' >
              {
              info.grandtotal &&
              <Grid item  xs={12}>
              <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:0,marginBottom:15}}>
              <Typography
              color="primary"
                variant="h6"
              className={classes.tag}
              
            >
              Total price: 
            </Typography>
            <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
              {info.grandtotal}$
            </Typography>
              </Box>
              <Divider/>
            </Grid>
              }
              {
              info.startdate &&
              <Grid item  xs={12}>
              <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
              <Typography
              color="primary"
                variant="h6"
              className={classes.tag}
              
            >
              startdate :
            </Typography>
            {console.log('dfghjklkjhgfddfgh',formatDate())}
            <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
              {info.status==='Draft'? 'you need to activate contract':formatDate(info.startdate)}
            </Typography>
              </Box>
              <Divider/>
            </Grid>
              }
              {
              info.contractterm&&
              <Grid item  xs={12}>
              <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
              <Typography
              color="primary"
                variant="h6"
              className={classes.tag}
              
            >
              Duration :
            </Typography>
            <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
              {info.status==='Draft'? 'you need to activate contract':maxContractTerm(info.products)+" months"}
            </Typography>
              </Box>
              <Divider/>
            </Grid>
              }
              
              {
              info.products &&
              <Grid item  xs={12}>
                <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginLeft:'-15px',marginTop:5,marginBottom:15}}>
                 <List>
                   <ListItem>
                        <Typography color="primary" variant="h6" className={classes.tag}>
                          Services(s) :
                          </Typography>
                    </ListItem>
            
                </List>
                <List>
                  
                  {
                    info.products.map((product,i)=>(
                      <ListItem key={i}>
                         <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:isSm ?'-20px':0}}>
                           {product.name+" for "+product.duration+" months"}
                          </Typography>
                      </ListItem>
                    ))
                  }
                </List>
              </Box>
              <Divider/>
            </Grid>
              }
              {
              true &&
              <Grid item  xs={12}>
              <Box display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} style={{marginTop:20,marginBottom:15}}>
              <Typography
              color="primary"
                variant="h6"
              className={classes.tag}
              
            >
              End date:
            </Typography>
            <Typography color='textPrimary'  component="p" variant="h6"  style={{ marginLeft:'10px'}}>
            {info.status==='Draft'? 'you need to activate contract':formatDate(dateWithMonthsDelay(info.startdate,maxContractTerm(info.products)))}
            </Typography>
              </Box>
            </Grid>
              }
            <Grid item xs={12}>
              <Box display={'flex'} mt={isSm? 0:5} justifyContent={isSm?'flex-end':'center'} width={'100%'}>
                <Button variant='contained' color='secondary' onClick={()=>sendByEmail(info.contractsfid)} size={isSm ?"large":"small"}>
                  Send contract by email
                </Button>

              </Box>
            </Grid>
            {waiting===info.contractsfid &&
          <Grid item xs={12}>
            <Button
            size="large"
            variant="contained"
            type="submit"
            style={{backgroundColor:"green", marginTop:'20px',color:'white',fontWeight:900}}
            fullWidth
          >
            sending email ..please check your inbox
          </Button>
          </Grid>
          }
          </Grid>
        </SectionAlternate>
         </Grid>
     
   </Grid>
  )   
}

export default function Contracts() {
  const [draftcontracts,setDraftcontracts]=React.useState([])
  const[activatedcontracts,setActivatedcontracts]=React.useState([])
  const [waiting ,setWaiting]=React.useState('x')

  React.useEffect(() => {
    if(localStorage.getItem('quoteSfid')){

      const form={
        contExternalId__c:localStorage.getItem('quoteSfid')+";"+(Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*100000).toString() ,
  
      }
      const config = {
        headers:{
          authorization:localStorage.getItem('jwt')
          
        }
      };
      const url =process.env.REACT_APP_DOMAIN+'/insertcontract';
      axios.post(url,form,config)
      .then(reslt=>{
        console.log("closed won")
        console.log(reslt.data)
        localStorage.removeItem("quoteSfid")
        setTimeout(()=>{
          window.location.reload()  
        },4000)

       
      })
      .catch(err=>{
        console.log("errr",err)
        
      
      })
    
    }
    const config = {
      headers:{
        authorization:localStorage.getItem('jwt')
        
      }
    };
    const url =process.env.REACT_APP_DOMAIN+'/draftcontracts';
    
    axios.get(url,config)
    .then(reslt=>{
      console.log(reslt.data[0])
      console.log("icix");
      console.log(localStorage.getItem('jwt'))
      const allData=reslt.data
      var contractIds=[]
      var contractInter=[]
      for(let i=0;i<allData.length;i++){
        if(contractIds.indexOf(allData[i].quotesfid)===-1){
          contractIds.push(allData[i].quotesfid)
          contractInter.push({
            products:[],
            status:allData[i].status,
            contractterm:allData[i].contractterm,
            startdate:allData[i].startdate,
            enddate:allData[i].enddate,
            grandtotal:allData[i].grandtotal,
            quotesfid:allData[i].quotesfid,
            contractsfid:allData[i].contractsfid
          })
        }
      }
      for(let i=0;i<allData.length;i++){
        for (let j=0;j<contractIds.length;j++){
          if(allData[i].quotesfid===contractInter[j].quotesfid){
            contractInter[j].products.push({name:allData[i].name,duration:allData[i].duration__c})
          }
        }
      }
       setDraftcontracts(contractInter)
    })
    .catch(err=>{
      console.log("errr",err)
    })
    const url1 =process.env.REACT_APP_DOMAIN+'/activatedcontracts';
    
    axios.get(url1,config)
    .then(reslt=>{
      console.log(reslt.data[0])
      console.log("iciy")
      const allData=reslt.data
      var contractIds=[]
      var contractInter=[]
      for(let i=0;i<allData.length;i++){
        if(contractIds.indexOf(allData[i].quotesfid)===-1){
          contractIds.push(allData[i].quotesfid)
          contractInter.push({
            products:[],
            status:allData[i].status,
            contractterm:allData[i].contractterm,
            startdate:allData[i].startdate,
            enddate:allData[i].enddate,
            grandtotal:allData[i].grandtotal,
            quotesfid:allData[i].quotesfid,
            contractsfid:allData[i].contractsfid
          })
        }
      }
      for(let i=0;i<allData.length;i++){
        for (let j=0;j<contractIds.length;j++){
          if(allData[i].quotesfid===contractInter[j].quotesfid){
            contractInter[j].products.push({name:allData[i].name,duration:allData[i].duration__c})
          }
        }
      }
       setActivatedcontracts(contractInter)
    })
    .catch(err=>{
      console.log("errr",err)
      
    
    })
  
  },[]);
 const sendByEmail =(sfid)=>{
  
  
  const form={
    sfid:sfid,
    emailValue:((Math.random()*Math.random()*Math.random())+1).toString()
  }
  const config = {
    headers:{
      authorization:localStorage.getItem('jwt')
      
    }
  };
  const url =process.env.REACT_APP_DOMAIN+'/sendemailContract';
  axios.put(url,form,config)
  .then(reslt=>{
    //localStorage.removeItem('jwt')
    //localStorage.setItem('jwt',reslt.data.token)
    console.log("resslt",reslt.data)
    setWaiting(sfid)
  setTimeout(()=>{
    setWaiting('x')
  },3000)
    
    
  })
  .catch(err=>
    console.log("signup err",err))
  
   
}

 const activateNow =(sfid,startdate,contractterm)=>{

  const form={
    sfid:sfid,
    startdate:startdate,
    contractterm:contractterm
  }
  const config = {
    headers:{
      authorization:localStorage.getItem('jwt')
      
    }
  };
  const url =process.env.REACT_APP_DOMAIN+'/activateContract';
  axios.put(url,form,config)
  .then(reslt=>{
    console.log("resslt",reslt.data)
    window.location.reload()    
  })
  .catch(err=>
    console.log("signup err",err))

 }

  return (
    <Grid container justifyContent='center' alignItems='center'>
     {
       draftcontracts.length>0 &&
       <Typography color='secondary'  component="p" variant="h4"  style={{ marginLeft:'10px'}}>
       Non-activated Contracts 
       </Typography>
     }
    {
      draftcontracts.map((draftcontract,index)=>(
        <DraftContracts info={draftcontract} sendByEmail={sendByEmail} waiting={waiting} activateNow={activateNow}  index={index} key={index} />
      ))
    }
    {
      activatedcontracts.length>0 &&
      <Typography color='secondary'  component="p" variant="h4"  style={{ marginTop:'40px', marginLeft:'10px'}}>
      Activated Contracts 
      </Typography>
    }
      {
      activatedcontracts.map((activatedcontract,index)=>(
        <DraftContracts info={activatedcontract} waiting={waiting} sendByEmail={sendByEmail} index={index} key={index} />
      ))
    }
    {
      activatedcontracts.length===0 && draftcontracts.length===0 &&
     
      <Typography color='secondary'  component="p" variant="h4"  style={{ marginTop:'40px', marginLeft:'10px'}}>
      No contracts yet  
      </Typography>
      

    }
    </Grid>

  )
}
