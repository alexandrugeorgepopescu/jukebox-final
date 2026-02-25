-- Database Schema for Rewind Jukebox (PostgreSQL / Supabase)

-- 1. Users (Extended for CRM)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    gender VARCHAR(20), -- 'M', 'F', 'Other'
    city VARCHAR(100), -- Pentru segmentare geografică (e.g., 'Miroslava')
    
    -- Preferences
    coffee_preference VARCHAR(100),
    music_preferences TEXT[], -- Array: ['RETRO_WAVE', 'CHILL_FLOW']
    
    -- Gamification & Loyalty
    loyalty_points INTEGER DEFAULT 0,
    total_coffees_purchased INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    
    -- Marketing
    newsletter_subscribed BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- 2. Songs
CREATE TABLE songs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'RETRO_WAVE', etc.
    fun_message TEXT,
    destiny_prize VARCHAR(255),
    yt_url VARCHAR(500),
    spotify_url VARCHAR(500),
    apple_url VARCHAR(500),
    active BOOLEAN DEFAULT TRUE,
    play_count INTEGER DEFAULT 0, -- Track popularity
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Coffee Purchases (Pentru tracking și loyalty)
CREATE TABLE coffee_purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    coffee_type VARCHAR(100), -- 'Espresso', 'Cappuccino', etc.
    price DECIMAL(10, 2),
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    location VARCHAR(100), -- 'Miroslava Cafe', 'Iași Center', etc.
    
    -- Loyalty tracking
    is_free BOOLEAN DEFAULT FALSE, -- Dacă e cafea gratuită (la a 8-a)
    loyalty_cycle INTEGER -- Care ciclu de 8 cafele (1, 2, 3...)
);

-- 4. Daily Scans (The "Drop" - Music Jukebox)
CREATE TABLE scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    song_id UUID REFERENCES songs(id) ON DELETE SET NULL,
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: "One scan per user per day" constraint enforced in application code

-- 5. Rewards
CREATE TABLE rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50), -- 'FREE_COFFEE', 'ICE_BAG', 'DISCOUNT_10'
    code VARCHAR(50) UNIQUE,
    redeemed BOOLEAN DEFAULT FALSE,
    redeemed_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. User Playlist Tracking (Ce muzică ascultă)
CREATE TABLE user_playlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
    listened_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_city ON users(city);
CREATE INDEX idx_users_birth_date ON users(birth_date);
CREATE INDEX idx_coffee_purchases_user ON coffee_purchases(user_id, purchased_at DESC);
CREATE INDEX idx_scans_user ON scans(user_id, scanned_at DESC);
CREATE INDEX idx_playlists_user ON user_playlists(user_id, listened_at DESC);
