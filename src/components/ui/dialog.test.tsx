import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeAll } from "vitest"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog" 



beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
  
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
  window.HTMLElement.prototype.releasePointerCapture = vi.fn()
  window.HTMLElement.prototype.hasPointerCapture = vi.fn()
})

describe("Dialog Component", () => {
  it("renders closed by default", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>Content</DialogContent>
      </Dialog>
    )

    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument()
    expect(screen.queryByText("Content")).not.toBeInTheDocument()
  })

  it("opens when the trigger is clicked and closes when the X button is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Modal Title</DialogTitle>
          <DialogDescription>Modal Description</DialogDescription>
          <p>Important Content</p>
        </DialogContent>
      </Dialog>
    )

    
    await user.click(screen.getByRole("button", { name: "Open Dialog" }))
    
    
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("Important Content")).toBeInTheDocument()
    
    
    const dialog = screen.getByRole("dialog")
    expect(dialog).toHaveAttribute("aria-labelledby", expect.stringMatching(/radix-/))
    expect(dialog).toHaveAttribute("aria-describedby", expect.stringMatching(/radix-/))

    
    const closeButton = screen.getByRole("button", { name: "Close" })
    await user.click(closeButton)

    
    await waitFor(() => {
      expect(screen.queryByText("Important Content")).not.toBeInTheDocument()
    })
  })

  it("renders styling classes correctly on sub-components", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent className="custom-content-class">
          <DialogHeader className="custom-header-class">
            <DialogTitle className="custom-title-class">Title</DialogTitle>
            <DialogDescription className="custom-desc-class">Desc</DialogDescription>
          </DialogHeader>
          <DialogFooter className="custom-footer-class">
            <button>Action</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    
    const dialog = screen.getByRole("dialog")
    expect(dialog).toHaveClass("custom-content-class")
    
    expect(dialog).toHaveClass("grid", "w-full", "bg-background") 

    expect(screen.getByText("Title")).toHaveClass("custom-title-class", "font-semibold")
    expect(screen.getByText("Desc")).toHaveClass("custom-desc-class", "text-muted-foreground")
})

  it("closes when the explicit DialogClose button is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogClose>Explicit Close</DialogClose>
        </DialogContent>
      </Dialog>
    )

    
    await user.click(screen.getByRole("button", { name: "Open" }))
    expect(screen.getByRole("dialog")).toBeInTheDocument()

    
    await user.click(screen.getByRole("button", { name: "Explicit Close" }))

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })
  })
})