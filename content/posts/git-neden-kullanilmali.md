---
title: Git Neden Kullanılmalı ve Bu Nedir?
date: 2025-01-15
template: post
categories:
  - Technical
tags:
  - Git
  - Version Control
  - Development
  - Tools
---

Git, modern yazılım geliştirmenin temel taşlarından biri. Ama Git nedir ve neden bu kadar önemli? Bu yazıda Git'in ne olduğunu, neden kullanılması gerektiğini ve pratik kullanım senaryolarını ele alacağım.

## Git Nedir?

Git, **dağıtık versiyon kontrol sistemi**dir. Basitçe söylemek gerekirse, kodunuzun değişiklik geçmişini takip eden bir araçtır. Her değişikliği kaydeder, geri dönebilirsiniz ve farklı versiyonları yönetebilirsiniz.

## Neden Git Kullanılmalı?

### 1. Değişiklik Geçmişi

Git, projenizdeki her değişikliği kaydeder. Bir hata yaptığınızda veya eski bir versiyona dönmek istediğinizde, Git size bu imkanı sağlar.

```bash
# Son commit'e geri dön
git reset --hard HEAD

# Belirli bir commit'e geri dön
git checkout <commit-hash>
```

### 2. Branch (Dal) Sistemi

Farklı özellikler veya denemeler için ayrı dallar oluşturabilirsiniz. Ana kodunuz güvende kalırken, yeni özellikler üzerinde çalışabilirsiniz.

```bash
# Yeni branch oluştur
git checkout -b yeni-ozellik

# Branch'ler arasında geçiş
git checkout main
```

### 3. Ekip Çalışması

Birden fazla geliştirici aynı projede çalışırken, Git çakışmaları yönetmenize yardımcı olur. Herkes kendi dalında çalışır, sonra değişiklikler birleştirilir.

### 4. Yedekleme ve Senkronizasyon

GitHub, GitLab gibi platformlarla kodunuz bulutta saklanır. Bilgisayarınız bozulsa bile kodunuz güvendedir.

### 5. Deneme Yapma Özgürlüğü

Git sayesinde "ya bozarsam" endişesi olmadan denemeler yapabilirsiniz. Her zaman geri dönebilirsiniz.

## Git'in Temel Komutları

### Başlangıç

```bash
# Yeni bir Git repository'si başlat
git init

# Mevcut bir repository'yi klonla
git clone <url>
```

### Değişiklikleri Kaydetme

```bash
# Değişiklikleri staging area'ya ekle
git add .

# Değişiklikleri commit et
git commit -m "Açıklayıcı mesaj"

# Uzak repository'ye gönder
git push
```

### Durum Kontrolü

```bash
# Değişiklik durumunu görüntüle
git status

# Commit geçmişini görüntüle
git log

# Değişiklikleri görüntüle
git diff
```

## Pratik Senaryolar

### Senaryo 1: Yeni Özellik Geliştirme

```bash
# Yeni branch oluştur
git checkout -b login-ozelligi

# Değişiklikleri yap ve commit et
git add .
git commit -m "Login özelliği eklendi"

# Ana branch'e birleştir
git checkout main
git merge login-ozelligi
```

### Senaryo 2: Hata Düzeltme

```bash
# Hata düzeltme branch'i oluştur
git checkout -b bugfix/login-hatasi

# Düzeltmeyi yap ve commit et
git add .
git commit -m "Login hatası düzeltildi"

# Ana branch'e merge et
git checkout main
git merge bugfix/login-hatasi
```

### Senaryo 3: Eski Versiyona Dönme

```bash
# Commit geçmişini görüntüle
git log

# Belirli bir commit'e geri dön
git checkout <commit-hash>

# Veya belirli bir dosyayı eski haline döndür
git checkout <commit-hash> -- <dosya-adi>
```

## Git vs. Diğer Çözümler

### Git vs. Manuel Yedekleme

- **Manuel**: `proje-v1.zip`, `proje-v2.zip` gibi dosyalar
- **Git**: Otomatik, organize, kolay geri dönüş

### Git vs. Dropbox/Google Drive

- **Cloud Storage**: Tüm dosyaları senkronize eder, çakışmalar olabilir
- **Git**: Sadece değişiklikleri takip eder, akıllı birleştirme yapar

## Git Öğrenmek İçin

Git başlangıçta karmaşık gelebilir, ama temel komutları öğrendikten sonra hayatınızı kolaylaştırır. Başlamak için:

1. **Temel komutları öğren**: `init`, `add`, `commit`, `push`
2. **Branch kavramını anla**: `checkout`, `merge`
3. **Pratik yap**: Küçük projelerle denemeler yap
4. **GitHub kullan**: Uzak repository'lerle çalışmayı öğren

## Sonuç

Git, modern yazılım geliştirmenin olmazsa olmazı. İster tek başınıza çalışın, ister büyük bir ekiple, Git size:
- Güvenli değişiklik yönetimi
- Kolay geri dönüş imkanı
- Ekip çalışması desteği
- Kod yedekleme

sağlar. Git öğrenmek zaman alabilir, ama kesinlikle değer.

> "Git is not just a version control system, it's a way of thinking about code."

