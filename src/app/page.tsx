"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";

const HomePage = () => {
  const canvasRef = useRef(null);
  const { data: session } = useSession();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particles = [];

    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    class Particle {
      constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseColor = 150; // Random starting hue
        this.hue = this.baseColor;
        this.light = 40;
        this.goUp = false;
        this.opacity = 20;
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        };
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.light}%, ${this.opacity}%)`; // Change color dynamically
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = mouse.radius;

        if (distance < maxDistance) {
          this.hue = 360 * (distance / maxDistance); // Color shifts based on distance
          this.x += dx / 20;
          this.y += dy / 20;
        } else {
          this.hue += 0.005; // Slow color shift over time
          this.light = this.goUp ? this.light + 0.1 : this.light - 0.1;
          if (this.opacity < 60) this.opacity += 0.05;
          this.x += this.velocity.x;
          this.y += this.velocity.y;
        }

        if (this.light >= 100) {
          this.goUp = false;
        } else if (this.light < 20) {
          this.goUp = true;
        }

        if (this.x > width || this.x < 0) this.velocity.x *= -1;
        if (this.y > height || this.y < 0) this.velocity.y *= -1;

        this.draw();
      }
    }

    function initParticles() {
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 3 + 1;

        particles.push(new Particle(x, y, size));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => particle.update());
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white space-y-6">
        <motion.h1
          className="text-7xl font-bold leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r dark:from-green-400/90 dark:to-blue-500/90 from-white/80 to-white/90"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Open Project Club
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-green-200 text-opacity-87"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Build, innovate, and collaborate with teammates who share{" "}
          <motion.span
            initial={{
              fontWeight: 400,
              color: "rgb(187 247 208 / var(--tw-text-opacity))",
            }} // Normal weight initially
            animate={{
              fontWeight: [400, 600, 600, 400],
              color: [
                "rgb(187 247 208 / var(--tw-text-opacity))",
                "rgb(74 222 128 / var(--tw-text-opacity))",
                "rgb(74 222 128 / var(--tw-text-opacity))",
                "rgb(187 247 208 / var(--tw-text-opacity))",
              ],
            }} // Bold when underlined
            transition={{
              delay: 3.5, // Wait 4 seconds before bolding
              duration: 4, // 2s appear, 4s stay, 4s fade out
              times: [0, 0.2, 0.8, 1], // Same timing as underline
              ease: "easeInOut",
            }}
            className="relative text-green-400"
          >
            your
            <motion.span
              initial={{ scaleX: 0 }} // Start with no underline
              animate={{ scaleX: [0, 1, 1, 0] }} // Expand underline
              transition={{
                delay: 3.5, // Wait 2 seconds before animating
                duration: 4, // Total duration (2s appear, 4s stay, 4s disappear)
                times: [0, 0.2, 0.8, 1],
                ease: "easeInOut",
              }}
              className="absolute left-0 -bottom-1 w-full h-[1px] bg-green-400 origin-left"
            />
          </motion.span>{" "}
          vision
        </motion.p>

        {!session ? (
          <motion.button
            onClick={() => signIn()}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-indigo-500/50 transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Log In
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="mb-6">Welcome, {session.user.name}!</p>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                href="/discord-invite"
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-green-500/50"
              >
                Join our Discord!
              </Link>
              <button
                onClick={() => signOut()}
                className="px-6 py-2 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-red-500/50"
              >
                Log Out
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
