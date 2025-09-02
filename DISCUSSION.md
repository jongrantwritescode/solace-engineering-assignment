
---
# Intro

First off, a big thank you to **Solace** for the opportunity to work on this project — I had a lot of fun diving in, experimenting, and improving the codebase 🚀 

---

# Approach

To kick off this project, I:

1. **Set up the repo**  
   - Downloaded the project  
   - Created a new GitHub repository  
   - Committed the initial code  

2. **Got it running**  
   - Executed the code “as is”  
   - Fixed runtime errors, TypeScript errors, and broken functionality  
   - Ensured we had a clean, working build  

3. **Improved UI & UX**  
   - Used the [Solace homepage](https://www.solace.health) as a design guide  
   - Styled the page to align closely with the company’s brand  

4. **Connected the backend**  
   - Verified database connectivity  
   - Asked Codex for suggestions → which led to:  
     - Server-side search optimization  
     - Input sanitization  

5. **Kept iterating**  
   - Improved component structure  
   - Enhanced user safety  
   - Added tests for reliability  

---

# To-Do

## Further Componentization
Break the table into smaller, reusable pieces.  
- Consider a **generic table component** with configurable:  
  - Headings  
  - Pagination controls  
  - Sorting  
  - Dynamic content  

## Localization
Move all text into JSON and serve via **i18next** for full localization support.  

## Codex Suggestions to Revisit
- **Search term sanitization + manual DOM updates**  
  - Using `sanitizeInput` + refs to set `textContent` turns characters like `&` into entities (`&amp;`)  
  - This bypasses React’s normal rendering → could break searches & complicate maintenance  

- **Debounced search hook + unmounting**  
  - `useDebouncedSearch` leaves in-flight requests alive if the component unmounts  
  - May cause **state updates on unmounted components** → potential bugs  

---

# Duration of Coding
**2 hrs 19 min**
