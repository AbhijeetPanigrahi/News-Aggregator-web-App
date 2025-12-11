import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const HeroSection = styled.div`
  width: 100%;
  height: 300px;
  background: url("path/to/your/image.jpg") center/cover no-repeat;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
`;

export const HeroText = styled.h1`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
`;

export const CategoryChip = styled.div`
  display: inline-block;
  padding: 10px 15px;
  margin: 5px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
`;

export const NewsCard = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 15px;
  margin: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
    transform: scale(1.1);
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 20px;
`;

export const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  color: #ccc;
  font-size: 1.2rem;
`;
