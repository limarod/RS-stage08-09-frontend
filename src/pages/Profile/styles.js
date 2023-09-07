import {styled}  from 'styled-components';

export const Container = styled.div`
  width: 100%;

  >header{
    width: 100%;
    height: 144px;

    background: ${({theme}) => theme.COLORS.BACKGROUND_900};

    display: flex;
    align-items: center;
    padding: 0 12px;

    svg{
      color: ${({theme}) => theme.COLORS.GRAY_100};
      font-size: 24px;
    }
  }
`;


export const Form = styled.form`
  max-width: 340px;
  margin: 30px auto 0;
  display: flex;
  flex-direction: column;

  >div:nth-child(4){
    margin-top: 36px;
  }
`;


export const Avatar = styled.div`
  position: relative;
  margin: -124px auto 32px;

  >img{
    width: 186px;
    border-radius: 50%;
  }

  >label{
    width: 48px;
    height: 48px;

    background-color: ${({theme}) => theme.COLORS.ORANGE};
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 7px;
    bottom: 7px;

    cursor: pointer;

    input{
      display: none;
    }

    svg{
      color:${({theme}) => theme.COLORS.BACKGROUND_800};
      width: 20px;
      height: 20px;
    }
  }
`;