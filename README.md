# Ciągnienie

**Cel programu:**
Program ma na celu obliczenia średnic pręta dla kolejnych ciągów na podstawie:
- Początkowej średnicy pręta d0	
- Końcowej średnicy pręta dk
- Maksymalnego pojedynczego względnego ubytku przekroju qmax
- Minimalnego pojedynczego względnego ubytku przekroju qmin

![image](https://user-images.githubusercontent.com/48060008/70318746-0e3baa00-1821-11ea-8789-85ed548c6a82.png)

Opcjonalnie można podać także liczbę ciągów którą chcemy zastosować, by uzyskać pręt/drut o zadanej średnicy.


![image](https://user-images.githubusercontent.com/48060008/70319262-2c55da00-1822-11ea-9990-80284b484bd0.png)

**Dodatkowo program oblicza (dla każdego ciągu):**
- Całkowity współczynnik wydłużenia λc
- Pojedynczy współczynnik wydłużenia λp
- Całkowity względy ubytek przekroju qc

![image](https://user-images.githubusercontent.com/48060008/70319233-1a743700-1822-11ea-8395-78d85c1c2e3f.png)

**Technologia:**
- Program został napisany przy użyciu biblioteki React w języku JavaScript.
- Za zarządzanie stanem aplikacji odpowiada biblioteka MobX.
- Szatę graficzną wspomaga biblioteka Bootstrap.
