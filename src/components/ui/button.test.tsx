import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"

import { Button } from "./button"

describe("Button Component", () => {
  it("renders the button with default props", () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole("button", { name: /click me/i })
    
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("data-variant", "default")
    expect(button).toHaveAttribute("data-size", "default")
    expect(button).toHaveClass("bg-primary")
  })

  it("allows custom class names to merge", () => {
    render(<Button className="custom-test-class">Click me</Button>)
    
    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-test-class")
    expect(button).toHaveClass("inline-flex")
  })

  it("handles interactions using user-event", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole("button")

    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("renders as a child element (Polymorphism) when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/dashboard">Go to Dashboard</a>
      </Button>
    )

    const link = screen.getByRole("link", { name: /go to dashboard/i })
    
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/dashboard")
    expect(link).toHaveClass("bg-primary")
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("does not trigger click events when disabled", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    
    const button = screen.getByRole("button")
    
    expect(button).toBeDisabled()

    await user.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  describe("Variants", () => {
    const variants = [
      { name: "destructive", class: "bg-destructive" },
      { name: "outline", class: "border bg-background" },
      { name: "secondary", class: "bg-secondary" },
      { name: "ghost", class: "hover:bg-accent" },
      { name: "link", class: "text-primary underline-offset-4" },
    ] as const

    variants.forEach(({ name, class: expectedClass }) => {
      it(`renders the ${name} variant correctly`, () => {
        render(<Button variant={name}>{name}</Button>)
        const button = screen.getByRole("button")
        expect(button).toHaveClass(expectedClass)
        expect(button).toHaveAttribute("data-variant", name)
      })
    })
  })

  describe("Sizes", () => {
    it("renders small size", () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("h-8")
      expect(button).toHaveAttribute("data-size", "sm")
    })

    it("renders large size", () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("h-10")
    })

    it("renders icon size", () => {
      render(<Button size="icon">Icon</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("size-9")
    })
  })
})