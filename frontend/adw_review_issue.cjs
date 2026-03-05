const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:9190';
  const evidencesDir = '/mnt/c/Users/amassaguer/Documents/CODE/adw-todo-app-demo/trees/issue-1/.issues/1/evidences';

  try {
    // Screenshot 1: Main view
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${evidencesDir}/01_vista_principal.png`, fullPage: true });
    console.log('Screenshot 1: Main view taken');

    // Screenshot 2: Task form with date input visible
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const dateInput = await page.$('input[type="date"]');
    if (dateInput) {
      await dateInput.scrollIntoViewIfNeeded();
    }
    await page.screenshot({ path: `${evidencesDir}/02_formulario_con_fecha.png`, fullPage: true });
    console.log('Screenshot 2: Form with date input taken');

    // Screenshot 3: Create a task with a due date (overdue - past date)
    const titleInput = await page.$('input[type="text"]');
    if (titleInput) {
      await titleInput.fill('Tarea con fecha vencida');
      if (dateInput) {
        await dateInput.fill('2024-01-01');
      }
      const submitBtn = await page.$('button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
        await page.waitForTimeout(1500);
      }
    }
    await page.screenshot({ path: `${evidencesDir}/03_tarea_vencida.png`, fullPage: true });
    console.log('Screenshot 3: Overdue task taken');

    // Screenshot 4: Create a task with a future date
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const titleInput2 = await page.$('input[type="text"]');
    const dateInput2 = await page.$('input[type="date"]');
    if (titleInput2) {
      await titleInput2.fill('Tarea con fecha futura');
      if (dateInput2) {
        await dateInput2.fill('2030-12-31');
      }
      const submitBtn = await page.$('button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
        await page.waitForTimeout(1500);
      }
    }
    await page.screenshot({ path: `${evidencesDir}/04_tarea_fecha_futura.png`, fullPage: true });
    console.log('Screenshot 4: Future date task taken');

    // Screenshot 5: Create a task without date
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const titleInput3 = await page.$('input[type="text"]');
    if (titleInput3) {
      await titleInput3.fill('Tarea sin fecha limite');
      const submitBtn = await page.$('button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
        await page.waitForTimeout(1500);
      }
    }
    await page.screenshot({ path: `${evidencesDir}/05_lista_completa.png`, fullPage: true });
    console.log('Screenshot 5: Full list taken');

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
