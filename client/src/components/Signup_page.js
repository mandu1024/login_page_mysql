import React , {useState} from 'react'

const Signup_page=()=> {

    const [infoData, setInfoData] = useState({
        id:'',
        usingid: false,
        usingpw: false,
    });

    const [authNum, setAuthNum] = useState('');
    const [inputAuthNum, setInputAuthNum] = useState('');

    const onChange=e=>{
        setInfoData({
            [e.target.name]: e.target.value
        })
    }
    const onChangeNum = e=>{
        setInputAuthNum(e.target.value)
    }

    const checkID =e =>{
        e.preventDefault();
        console.log(infoData.id)

        const data ={
            id: infoData.id
        }

        console.log("data: "+ data.id)

        fetch('http://localhost:5000/checkid',{
            method: "post",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data), 
        })
        .then(res => res.json())
        .then(json=>{
            console.log("check point_1");
            if(json.bool === true){
                alert('사용 가능한 ID 입니다');
                setInfoData({
                    ...infoData,
                    usingid: true
                })
            }else{
                alert('다른 ID를 입력해주세요')
                setInfoData({
                    id:'',
                })
            }
        })
    }

    const sendEmail =e=>{
        e.preventDefault();
        
        let number = String(Math.floor(Math.random()*1000000));
        
        console.log(infoData.id)
        
        setAuthNum(number);
        const data = {
            id: infoData.id,
            num: number,
        }

        
        fetch('http://localhost:5000/sendEmail',{
            method: "post",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data),
        })

    }

    const onSubmit = e=>{
        e.preventDefault();
        console.log('e.authNum: '+inputAuthNum)
        if(authNum === inputAuthNum){
            console.log('인증이 되었습니다.')
        }else{
            console.log('인증 실패했습니다.')
        }
    }

    return (
        <div className ="login_content">
            <h1 className="signup_text" style ={{fontSize: '17pt'}}>회원가입</h1>
            <div>
                     ID: {infoData.id} &nbsp; <br/>
                     authNum: {authNum} <br/>
                     inputAuthNum: {inputAuthNum}
                         
            </div>
            <div className='inputboxz'>
                <input type="text" name="id" className="idinput" onChange={onChange} placeholder ="email"/><br/>
                <button onClick={checkID}>확인</button>
                <button onClick ={sendEmail} >전송</button>
            </div>
            <div>
                <input type="text" name="authN" placeholder ="인증번호" onChange={onChangeNum}/>
                <button onClick={onSubmit}>확인</button><br/>
            </div>
        </div>
    )
}

export default Signup_page;
