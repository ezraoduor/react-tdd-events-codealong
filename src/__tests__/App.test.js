import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import '@testing-library/jest-dom';

describe("Pizza Toppings App", () => {
  
  test("checkbox is initially unchecked", () => {
    render(<App />);
    const pepperoniCheckbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    expect(pepperoniCheckbox).not.toBeChecked();
  });

  
  test("toppings list initially contains only cheese", () => {
    render(<App />);
    
    const toppingsList = screen.getAllByRole("listitem");
    expect(toppingsList).toHaveLength(1);
    
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
  });

  
  test("checkbox becomes checked when clicked", () => {
    render(<App />);
    
    const pepperoniCheckbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    userEvent.click(pepperoniCheckbox);
    
    expect(pepperoniCheckbox).toBeChecked();
  });

  
  test("pepperoni appears in toppings when checked", () => {
    render(<App />);
    
    const pepperoniCheckbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    userEvent.click(pepperoniCheckbox);
    
    const toppingsList = screen.getAllByRole("listitem");
    expect(toppingsList).toHaveLength(2);
    
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();
  });

  
  test("pepperoni disappears when unchecked", () => {
    render(<App />);
    
    const pepperoniCheckbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    
    
    userEvent.click(pepperoniCheckbox);
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();
    
    
    userEvent.click(pepperoniCheckbox);
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
    
    const toppingsList = screen.getAllByRole("listitem");
    expect(toppingsList).toHaveLength(1);
    expect(screen.getByText("Cheese")).toBeInTheDocument();
  });
});