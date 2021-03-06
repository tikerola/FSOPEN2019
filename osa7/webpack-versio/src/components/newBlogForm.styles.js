import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 5px;
  padding: 15px;
  color: #ddd;
  background: #666;
  margin-bottom: 40px;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 15px;
`

export const Input = styled.input`
  border: none;
  background: inherit;
  border-bottom: 1px solid #555;
  display: inline;
  width: ${props => props.width || '70%'};
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 5px;
  color: #ddd;

  :focus {
    outline: none;
  }
`

export const Label = styled.label`
  color: #ddd;
  display: inline-block;
  width: 22%;
`