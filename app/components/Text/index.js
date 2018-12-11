import styled from 'styled-components';

const Text = styled.div`
  color: #cccccc;
  text-align: center;
  padding-top: 0.25em;
  width: 90%;
  max-width: 90%
  text-overflow: ellipsis;
  height: 80%;
  overflow: hidden;
  word-wrap: normal;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical; 
`;

export default Text;
